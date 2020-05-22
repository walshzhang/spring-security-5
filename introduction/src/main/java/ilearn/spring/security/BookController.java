package ilearn.spring.security;

import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
public class BookController {
    private List<Book> books;

    public BookController() {
        books = new ArrayList<>();
    }

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return books;
    }

    @GetMapping("/books/{bookId}")
    public Optional<Book> getBook(@PathVariable int bookId) {
        return books.stream()
                .filter(book -> book.getId() == bookId)
                .findFirst();
    }

    @PostMapping("/books")
    public void addNewBook(@RequestBody Book book) {
        book.setId(books.size() + 1);
        books.add(book);
    }

    @PutMapping("/books/{bookId}")
    public void updateBook(@PathVariable int bookId, @RequestBody Book book) {
        if (books.stream().noneMatch(item -> Objects.equals(bookId, item.id))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Assert.isTrue(book.id == bookId, "book not found");
        books = books.stream()
                .map(item -> Objects.equals(bookId, item.id) ? book : item)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/books/{bookId}")
    public void removeBook(@PathVariable int bookId) {
        if (books.stream().noneMatch(item -> Objects.equals(bookId, item.id))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        books.removeIf(book -> Objects.equals(book.id, bookId));
    }
}
