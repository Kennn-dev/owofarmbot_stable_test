import sys
import os
from pynput import keyboard

# Get the Node.js process ID from command-line arguments
node_pid = int(sys.argv[1])

# Function to kill the Node.js process when Win + L is detected
def on_press(key):
    try:
        global win_key_pressed
        # Detect Windows key (cmd) + 'L'
        if key == keyboard.Key.cmd:
            win_key_pressed = True
        elif key.char == 'l' and win_key_pressed:
            # Kill the Node.js process
            print(f"Killing Node.js process with PID {node_pid}")
            os.kill(node_pid, 9)  # Sending SIGKILL to the process
            win_key_pressed = False  # Reset the state after detecting
            return False  # Stop listener
    except AttributeError:
        pass

def on_release(key):
    global win_key_pressed
    if key == keyboard.Key.cmd:
        win_key_pressed = False

# Listener function that runs in the background
def listen_for_win_l():
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()

if __name__ == '__main__':
    win_key_pressed = False
    listen_for_win_l()
