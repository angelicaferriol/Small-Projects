import java.awt.*;
import java.awt.event.*;
import java.util.Random;
import javax.swing.*;

public class WhackAMole {

    int boardWidth = 600;
    int boardHeight = 700; // Extra height for reset button
    int highScore = 0;

    JFrame frame = new JFrame("Mario: Whack A Mole");
    JLabel textLabel = new JLabel();
    JPanel textPanel = new JPanel();
    JPanel boardPanel = new JPanel();

    JButton[] board = new JButton[9];
    ImageIcon moleIcon;
    ImageIcon plantIcon;

    JButton currMoleTile;
    JButton[] plantTiles = new JButton[3]; // Array for multiple piranha plants

    Random random = new Random();
    Timer setMoleTimer;
    Timer setPlantTimer;
    int score = 0;

    // Constructor
    WhackAMole() {
        frame.setVisible(true);
        frame.setSize(boardWidth, boardHeight);
        frame.setLocationRelativeTo(null);
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        textLabel.setFont(new Font("Arial", Font.PLAIN, 25));
        textLabel.setHorizontalAlignment(JLabel.CENTER);
        textLabel.setText("Score: 0");
        textLabel.setOpaque(true);

        JPanel textPanel = new JPanel();
        textPanel.setLayout(new BorderLayout());
        textPanel.add(textLabel);
        frame.add(textPanel, BorderLayout.NORTH);

        boardPanel.setLayout(new GridLayout(3, 3));
        frame.add(boardPanel);

        // Set images for mole and plant
        Image plantImg = new ImageIcon(getClass().getResource("./piranha.png")).getImage();
        plantIcon = new ImageIcon(plantImg.getScaledInstance(150, 150, java.awt.Image.SCALE_SMOOTH));

        Image moleImg = new ImageIcon(getClass().getResource("./monty.png")).getImage();
        moleIcon = new ImageIcon(moleImg.getScaledInstance(150, 150, java.awt.Image.SCALE_SMOOTH));

        // Create the tiles (buttons)
        for (int i = 0; i < 9; i++) {
            JButton tile = new JButton();
            board[i] = tile;
            boardPanel.add(tile);
            tile.setFocusable(false);
            tile.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    JButton tile = (JButton) e.getSource();
                    if (tile == currMoleTile) {
                        score += 10;
                        textLabel.setText("Score: " + Integer.toString(score));
                    } else if (contains(plantTiles, tile)) {
                        textLabel.setText("Game Over! Score: " + score + " | High Score: " + highScore);
                        setMoleTimer.stop();
                        setPlantTimer.stop();

                        // Disable all tiles
                        for (int i = 0; i < 9; i++) {
                            board[i].setEnabled(false);
                        }

                        // Update high score if current score is greater
                        if (score > highScore) {
                            highScore = score;
                        }
                    }
                }
            });
        }

        // Timer for mole
        setMoleTimer = new Timer(1000, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Remove mole from current tile
                if (currMoleTile != null) {
                    currMoleTile.setIcon(null);
                    currMoleTile = null;
                }

                // Randomly select another tile for the mole
                int num = random.nextInt(9);
                JButton tile = board[num];

                // If the tile is occupied by a plant, skip it
                if (contains(plantTiles, tile)) return;

                // Set tile to mole
                currMoleTile = tile;
                currMoleTile.setIcon(moleIcon);
            }
        });

        // Timer for piranha plants
        setPlantTimer = new Timer(1500, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Remove plants from all tiles
                for (int i = 0; i < plantTiles.length; i++) {
                    if (plantTiles[i] != null) {
                        plantTiles[i].setIcon(null);
                        plantTiles[i] = null;
                    }
                }

                // Randomly place plants in different tiles
                for (int i = 0; i < plantTiles.length; i++) {
                    int num = random.nextInt(9);
                    JButton tile = board[num];

                    // Skip if tile is occupied by a mole or another plant
                    if (currMoleTile == tile || contains(plantTiles, tile)) {
                        i--; // Retry this loop iteration
                    } else {
                        plantTiles[i] = tile;
                        plantTiles[i].setIcon(plantIcon);
                    }
                }
            }
        });

        // Reset button
        JButton resetButton = new JButton("Reset");
        resetButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Reset score
                score = 0;
                textLabel.setText("Score: 0");

                // Re-enable all tiles
                for (int i = 0; i < 9; i++) {
                    board[i].setEnabled(true);
                    board[i].setIcon(null);
                }

                // Restart timers
                setMoleTimer.start();
                setPlantTimer.start();
            }
        });

        // Add reset button at the bottom of the frame
        frame.add(resetButton, BorderLayout.SOUTH);

        // Start the game
        setMoleTimer.start();
        setPlantTimer.start();
        frame.setVisible(true);
    }

    // Helper method to check if a tile contains a plant
    private boolean contains(JButton[] array, JButton tile) {
        for (JButton t : array) {
            if (t == tile) {
                return true;
            }
        }
        return false;
    }
}
