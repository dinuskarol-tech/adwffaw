#!/usr/bin/env python3
"""Jarvis-style voice assistant using speech_recognition + pyttsx3.

Requirements:
  pip install SpeechRecognition pyttsx3 pyaudio

Notes:
- On some systems you may need to install PortAudio (for PyAudio).
- Enable GUI dot by setting USE_GUI = True.
"""

from __future__ import annotations

import threading
import time
from typing import Callable, Dict, Optional

import speech_recognition as sr
import pyttsx3

try:
    import tkinter as tk
except Exception:  # tkinter may be unavailable
    tk = None

WAKE_WORDS = ("hej jarvis", "ok jarvis")

# Toggle GUI indicator (dot) showing when Jarvis speaks.
USE_GUI = False


def log_user(text: str) -> None:
    print(f"[Ty]: {text}")


def log_jarvis(text: str) -> None:
    print(f"[Jarvis]: {text}")


class VoiceIndicator:
    """Optional GUI indicator showing when Jarvis speaks."""

    def __init__(self) -> None:
        if tk is None:
            raise RuntimeError("tkinter not available")
        self.root = tk.Tk()
        self.root.title("Jarvis")
        self.root.geometry("160x160")
        self.root.resizable(False, False)
        self.canvas = tk.Canvas(self.root, width=160, height=160, bg="#111")
        self.canvas.pack()
        self.dot = self.canvas.create_oval(40, 40, 120, 120, fill="#555", outline="")

    def set_state(self, speaking: bool) -> None:
        color = "#33ccff" if speaking else "#555"

        def update() -> None:
            self.canvas.itemconfig(self.dot, fill=color)

        self.root.after(0, update)

    def run(self) -> None:
        self.root.mainloop()


class Jarvis:
    def __init__(self, indicator: Optional[VoiceIndicator] = None) -> None:
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.engine = pyttsx3.init()
        self.indicator = indicator
        self.commands: Dict[str, Callable[[], str]] = {
            "włącz światło": self.turn_on_lights,
            "wyłącz telewizor": self.turn_off_tv,
            "odtwórz muzykę": self.play_music,
            "pomoc": self.list_commands,
        }
        self._configure_tts()

    def _configure_tts(self) -> None:
        """Optional TTS configuration."""
        self.engine.setProperty("rate", 175)

    def speak(self, text: str) -> None:
        """Speak text with TTS and update indicator."""
        log_jarvis(text)
        try:
            if self.indicator:
                self.indicator.set_state(True)
            self.engine.say(text)
            self.engine.runAndWait()
        except Exception as exc:
            print(f"[Jarvis][Błąd TTS]: {exc}")
        finally:
            if self.indicator:
                self.indicator.set_state(False)

    def listen(self, timeout: Optional[float] = None) -> Optional[str]:
        """Listen for a single phrase and return recognized text."""
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.5)
            try:
                audio = self.recognizer.listen(source, timeout=timeout)
            except sr.WaitTimeoutError:
                return None
        try:
            return self.recognizer.recognize_google(audio, language="pl-PL").lower()
        except sr.UnknownValueError:
            return None
        except sr.RequestError as exc:
            print(f"[Jarvis][Błąd STT]: {exc}")
            return None

    def wait_for_wake_word(self) -> Optional[str]:
        """Continuously listen for wake word and return text if detected."""
        text = self.listen()
        if not text:
            return None
        if any(wake in text for wake in WAKE_WORDS):
            return text
        return None

    def handle_command(self, text: str) -> None:
        """Handle a command by finding matching keyword."""
        log_user(text)
        for phrase, action in self.commands.items():
            if phrase in text:
                response = action()
                self.speak(response)
                return
        self.speak("Nie rozumiem komendy. Powiedz 'pomoc', aby zobaczyć listę.")

    # === Example commands below ===
    # Add your own commands by creating a method and adding it to self.commands.
    def turn_on_lights(self) -> str:
        return "Światło zostało włączone."

    def turn_off_tv(self) -> str:
        return "Telewizor został wyłączony."

    def play_music(self) -> str:
        return "Odtwarzam muzykę."

    def list_commands(self) -> str:
        available = ", ".join(sorted(self.commands.keys()))
        return f"Dostępne komendy: {available}."

    def run(self) -> None:
        """Main loop: wait for wake word, then process command."""
        self.speak("Jarvis jest gotowy. Powiedz 'Hej Jarvis' lub 'Ok Jarvis'.")
        while True:
            try:
                wake_text = self.wait_for_wake_word()
                if not wake_text:
                    continue

                remainder = wake_text
                for wake in WAKE_WORDS:
                    remainder = remainder.replace(wake, "").strip()

                if remainder:
                    self.handle_command(remainder)
                    continue

                self.speak("Słucham.")
                command_text = self.listen(timeout=5)
                if command_text:
                    self.handle_command(command_text)
                else:
                    self.speak("Nie usłyszałem komendy.")
            except Exception as exc:
                print(f"[Jarvis][Błąd]: {exc}")
                time.sleep(1)


def main() -> None:
    indicator = None
    if USE_GUI:
        indicator = VoiceIndicator()

    jarvis = Jarvis(indicator=indicator)

    if indicator:
        listener_thread = threading.Thread(target=jarvis.run, daemon=True)
        listener_thread.start()
        indicator.run()
    else:
        jarvis.run()


if __name__ == "__main__":
    main()
