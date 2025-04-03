import pygame
import random
import time

# Initialize Pygame
pygame.init()

# Set up the display
WIDTH = 800
HEIGHT = 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Decoherence Visual Effect")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Font
font = pygame.font.Font(None, 36)

def shake_screen():
    """Apply screen shake effect"""
    offset_x = random.randint(-10, 10)
    offset_y = random.randint(-10, 10)
    return offset_x, offset_y

def main():
    clock = pygame.time.Clock()
    running = True
    base_surface = pygame.Surface((WIDTH, HEIGHT))
    
    # Message
    message = "DECOHERENCE EVENT DETECTED!"
    text = font.render(message, True, RED)
    text_rect = text.get_rect(center=(WIDTH//2, HEIGHT//2))
    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
        
        # Fill the base surface with white
        base_surface.fill(WHITE)
        
        # Apply shake effect
        offset_x, offset_y = shake_screen()
        
        # Clear the main screen
        screen.fill(BLACK)
        
        # Draw the base surface with offset (shake effect)
        screen.blit(base_surface, (offset_x, offset_y))
        
        # Draw the message with a slight offset for better visibility
        screen.blit(text, (text_rect.x + offset_x, text_rect.y + offset_y))
        
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
