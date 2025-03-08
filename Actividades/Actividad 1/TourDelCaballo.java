package tour.del.caballo;

import java.util.Arrays;

public class TourDelCaballo {
    static final int N = 8;
    static int[][] tablero = new int[N][N];

    // Movimientos del caballo (L)
    static int[] movX = {2, 1, -1, -2, -2, -1, 1, 2};
    static int[] movY = {1, 2, 2, 1, -1, -2, -2, -1};

    public static void main(String[] args) {
        for (int[] fila : tablero) Arrays.fill(fila, -1);
        
        int x = 3, y = 3;
        tablero[x][y] = 1;

        // Resolver el recorrido del caballo
        if (resolverRecorrido(x, y, 2)) {
            System.out.println("Tablero con el recorrido del caballo:");
            imprimirTablero();
        } else {
            System.out.println("No se encontró solución.");
        }
    }

    static boolean resolverRecorrido(int x, int y, int movCount) {
        if (movCount > N * N) return true;
        
        int[][] movimientos = new int[8][2];
        for (int i = 0; i < 8; i++) {
            int nx = x + movX[i], ny = y + movY[i];
            movimientos[i] = new int[]{nx, ny, contarMovimientos(nx, ny)};
        }
        Arrays.sort(movimientos, (a, b) -> Integer.compare(a[2], b[2])); // Ordenar por menor accesibilidad

        for (int[] mov : movimientos) {
            int nx = mov[0], ny = mov[1];
            if (esMovimientoValido(nx, ny)) {
                tablero[nx][ny] = movCount;
                if (resolverRecorrido(nx, ny, movCount + 1)) return true;
                tablero[nx][ny] = -1; // Backtracking
            }
        }
        return false;
    }

    static int contarMovimientos(int x, int y) {
        int count = 0;
        for (int i = 0; i < 8; i++) {
            int nx = x + movX[i], ny = y + movY[i];
            if (esMovimientoValido(nx, ny)) count++;
        }
        return count;
    }

    static boolean esMovimientoValido(int x, int y) {
        return x >= 0 && x < N && y >= 0 && y < N && tablero[x][y] == -1;
    }

    static void imprimirTablero() {
        for (int[] fila : tablero) {
            for (int val : fila) {
                System.out.printf("%2d ", val);
            }
            System.out.println();
        }
    }
}
