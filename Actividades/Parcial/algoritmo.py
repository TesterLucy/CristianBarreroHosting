from itertools import permutations

# Lista de ciudades a visitar (excluyendo Bogotá)
cities = ["Tunja", "Chía", "La Vega", "Fusagasugá", "Girardot", "Tabio", "Ibagué", "Barbosa"]

# Tiempos (en minutos) desde Bogotá hacia cada ciudad (y viceversa, asumido simétrico)
times_from_bogota = {
    "Tunja": 154,    # 2h 34min
    "Chía": 51,      # 51min
    "La Vega": 132,  # 2h 12min
    "Fusagasugá": 211,  # 3h 31min
    "Girardot": 260, # 4h 20min
    "Tabio": 76,     # 1h 16min
    "Ibagué": 238,   # 3h 58min
    "Barbosa": 238   # 3h 58min
}

# Tiempos de viaje entre ciudades (en minutos)
travel_times = {
    ("Tunja", "Chía"): 66, ("Tunja", "La Vega"): 209, ("Tunja", "Fusagasugá"): 287,
    ("Tunja", "Girardot"): 331, ("Tunja", "Tabio"): 140, ("Tunja", "Ibagué"): 394, ("Tunja", "Barbosa"): 508,
    ("Chía", "La Vega"): 90, ("Chía", "Fusagasugá"): 204, ("Chía", "Girardot"): 250,
    ("Chía", "Tabio"): 34, ("Chía", "Ibagué"): 310, ("Chía", "Barbosa"): 524,
    ("La Vega", "Fusagasugá"): 188, ("La Vega", "Girardot"): 238, ("La Vega", "Tabio"): 94,
    ("La Vega", "Ibagué"): 288, ("La Vega", "Barbosa"): 434,
    ("Fusagasugá", "Girardot"): 78, ("Fusagasugá", "Tabio"): 171, ("Fusagasugá", "Ibagué"): 133,
    ("Fusagasugá", "Barbosa"): 494,
    ("Girardot", "Tabio"): 211, ("Girardot", "Ibagué"): 81, ("Girardot", "Barbosa"): 432,
    ("Tabio", "Ibagué"): 311, ("Tabio", "Barbosa"): 530,
    ("Ibagué", "Barbosa"): 491
}
# Hacemos simétrica la matriz (ruta bidireccional)
for (city1, city2), t in list(travel_times.items()):
    travel_times[(city2, city1)] = t

# Distancias (en km) desde Bogotá hacia cada ciudad (valor aproximado)
distances_from_bogota = {
    "Tunja": 140, "Chía": 22, "La Vega": 64, "Fusagasugá": 68,
    "Girardot": 140, "Tabio": 39, "Ibagué": 200, "Barbosa": 188
}

# Distancias de viaje entre ciudades (en km)
distance_matrix = {
    ("Tunja", "Chía"): 55.1, ("Tunja", "La Vega"): 197.2, ("Tunja", "Fusagasugá"): 210.4,
    ("Tunja", "Girardot"): 275.0, ("Tunja", "Tabio"): 132.3, ("Tunja", "Ibagué"): 342.1, ("Tunja", "Barbosa"): 373.8,
    ("Chía", "La Vega"): 69.1, ("Chía", "Fusagasugá"): 94.3, ("Chía", "Girardot"): 146.8,
    ("Chía", "Tabio"): 9.8, ("Chía", "Ibagué"): 223.4, ("Chía", "Barbosa"): 474.5,
    ("La Vega", "Fusagasugá"): 117.6, ("La Vega", "Girardot"): 170.1, ("La Vega", "Tabio"): 64.0,
    ("La Vega", "Ibagué"): 230.9, ("La Vega", "Barbosa"): 405.8,
    ("Fusagasugá", "Girardot"): 70.0, ("Fusagasugá", "Tabio"): 98.0, ("Fusagasugá", "Ibagué"): 131.3,
    ("Fusagasugá", "Barbosa"): 532.1,
    ("Girardot", "Tabio"): 151.0, ("Girardot", "Ibagué"): 68.5, ("Girardot", "Barbosa"): 464.9,
    ("Tabio", "Ibagué"): 227.0, ("Tabio", "Barbosa"): 466.2,
    ("Ibagué", "Barbosa"): 471.3
}
# Aseguramos simetría en la matriz de distancias
for (city1, city2), d in list(distance_matrix.items()):
    distance_matrix[(city2, city1)] = d

# Función para calcular el costo total de una ruta dada la función de costo (puede ser tiempo, distancia, o combinado)
def total_cost(route, cost_from_origin, cost_between, objective="time"):
    cost = cost_from_origin[route[0]]
    for i in range(len(route) - 1):
        cost += cost_between[(route[i], route[i+1])]
    cost += cost_from_origin[route[-1]]
    return cost

# Definir el costo combinado: para este ejemplo, sumamos tiempo (minutos) y distancia (asumiendo 1 km ~ 1 minuto)
def combined_cost(route):
    time_cost = total_cost(route, times_from_bogota, travel_times, "time")
    distance_cost = total_cost(route, distances_from_bogota, distance_matrix, "distance")
    return time_cost + distance_cost

# Buscamos la ruta óptima para cada criterio
min_time = float("inf")
best_time_route = None

min_distance = float("inf")
best_distance_route = None

min_combined = float("inf")
best_combined_route = None

for perm in permutations(cities):
    cost_time = total_cost(perm, times_from_bogota, travel_times, "time")
    cost_distance = total_cost(perm, distances_from_bogota, distance_matrix, "distance")
    cost_combined = combined_cost(perm)
    
    if cost_time < min_time:
        min_time = cost_time
        best_time_route = perm
        
    if cost_distance < min_distance:
        min_distance = cost_distance
        best_distance_route = perm
        
    if cost_combined < min_combined:
        min_combined = cost_combined
        best_combined_route = perm

# Función para formatear la ruta incluyendo Bogotá (punto de partida y llegada)
def format_route(route):
    return "Bogotá → " + " → ".join(route) + " → Bogotá"

# Imprimimos los resultados
print("1. Ruta MÁS RÁPIDA (minimiza el tiempo total):")
print(format_route(best_time_route))
print(f"Tiempo total estimado: {min_time} minutos (~{min_time/60:.2f} horas)")
print("\n2. Ruta MÁS CORTA (minimiza la distancia total):")
print(format_route(best_distance_route))
print(f"Distancia total estimada: {min_distance:.1f} km")
print("\n3. Ruta BALANCEADA (minimiza el costo combinado de tiempo + distancia):")
print(format_route(best_combined_route))
print(f"Costo combinado estimado: {min_combined} (minutos + km)")
