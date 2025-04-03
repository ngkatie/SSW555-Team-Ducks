import tkinter as tk
from tkinter import ttk
import math

class CircuitDisplay:
    def __init__(self, width: int = 800, height: int = 600):
        self.root = tk.Tk()
        self.root.title("Quantum Circuit Game")
        
        # Create canvas
        self.canvas = tk.Canvas(self.root, width=width, height=height, bg='white')
        self.canvas.pack(expand=True, fill='both')
        
        # Circuit properties
        self.num_qubits = 4
        self.qubit_spacing = height // (self.num_qubits + 1)
        self.qubit_positions = self._calculate_qubit_positions(width, height)
        self.entangled_qubits = {}
        self.selected_qubit = None
        
        # Bind mouse click
        self.canvas.bind('<Button-1>', self.on_click)
        
        # Draw initial circuit
        self.draw()
    
    def _calculate_qubit_positions(self, width, height):
        """Calculate the screen positions for each qubit."""
        return [(width // 4, i * self.qubit_spacing) 
                for i in range(1, self.num_qubits + 1)]
    
    def add_entanglement(self, qubit1: int, qubit2: int):
        """Add an entanglement between two qubits."""
        if 0 <= qubit1 < self.num_qubits and 0 <= qubit2 < self.num_qubits:
            # Add to entanglement tracking
            if qubit1 not in self.entangled_qubits:
                self.entangled_qubits[qubit1] = set()
            if qubit2 not in self.entangled_qubits:
                self.entangled_qubits[qubit2] = set()
            
            self.entangled_qubits[qubit1].add(qubit2)
            self.entangled_qubits[qubit2].add(qubit1)
            self.draw()
    
    def draw_qubit(self, x, y, index, selected=False):
        """Draw a single qubit with its label."""
        color = 'blue' if selected else 'black'
        # Draw qubit circle
        self.canvas.create_oval(x-15, y-15, x+15, y+15, fill='white', outline=color, width=2)
        # Draw qubit label
        self.canvas.create_text(x, y, text=f'q{index}', fill=color)
        if selected:
            self.canvas.create_oval(x-20, y-20, x+20, y+20, outline='blue', width=2)
    
    def draw_entanglement_lines(self):
        """Draw lines connecting entangled qubits."""
        drawn_pairs = set()
        
        for q1 in self.entangled_qubits:
            for q2 in self.entangled_qubits[q1]:
                pair = tuple(sorted((q1, q2)))
                if pair not in drawn_pairs:
                    pos1 = self.qubit_positions[q1]
                    pos2 = self.qubit_positions[q2]
                    
                    # Create curved line using multiple points
                    points = []
                    for t in range(20):
                        t = t / 19  # Convert to 0-1 range
                        # Control point for curve
                        ctrl_x = (pos1[0] + pos2[0])/2 + 50
                        ctrl_y = (pos1[1] + pos2[1])/2
                        
                        # Quadratic Bezier curve
                        x = (1-t)**2 * pos1[0] + 2*(1-t)*t*ctrl_x + t**2*pos2[0]
                        y = (1-t)**2 * pos1[1] + 2*(1-t)*t*ctrl_y + t**2*pos2[1]
                        points.append(x)
                        points.append(y)
                    
                    # Draw the curve
                    if len(points) > 2:
                        self.canvas.create_line(*points, fill='red', width=2, smooth=True)
                    drawn_pairs.add(pair)
    
    def draw(self):
        """Draw the complete circuit visualization."""
        self.canvas.delete('all')
        
        # Draw qubit lines
        for i, (x, y) in enumerate(self.qubit_positions):
            self.canvas.create_line(50, y, self.canvas.winfo_width() - 50, y, fill='black')
            self.draw_qubit(x, y, i, selected=(i == self.selected_qubit))
        
        # Draw entanglement lines
        self.draw_entanglement_lines()
    
    def on_click(self, event):
        """Handle mouse click events."""
        for i, (x, y) in enumerate(self.qubit_positions):
            if (event.x - x)**2 + (event.y - y)**2 <= 400:  # 20px radius squared
                if self.selected_qubit is None:
                    self.selected_qubit = i
                else:
                    if self.selected_qubit != i:
                        self.add_entanglement(self.selected_qubit, i)
                    self.selected_qubit = None
                self.draw()
                break
    
    def run(self):
        """Run the visualization."""
        self.root.mainloop()

if __name__ == "__main__":
    display = CircuitDisplay()
    display.run()
