package com.example.demo.controller;

import com.example.demo.domain.Note;
import com.example.demo.repository.NoteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private final NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }
    @GetMapping
    public List<Note> getNotes() {
        return noteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Note getNote(@PathVariable Long id) {
        return noteRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createNote(@RequestBody Note note) throws URISyntaxException {
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.created(new URI("/notes/" + savedNote.getId())).body(savedNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note currentNote = noteRepository.findById(id).orElseThrow(RuntimeException::new);
        currentNote.setText(note.getText());
        currentNote = noteRepository.save(note);
        return ResponseEntity.ok(currentNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteNote(@PathVariable Long id) {
        noteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}