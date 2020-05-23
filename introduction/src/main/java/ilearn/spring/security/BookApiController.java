package ilearn.spring.security;

import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/books")
public class BookApiController {
    private final BookService service;

    public BookApiController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return service.getBooks();
    }

    @GetMapping("/{bookId}")
    public Book getBook(@PathVariable int bookId) {
        return service.getBook(bookId);
    }

    @PostMapping
    public void addNewBook(@RequestBody Book book) {
        service.newBook(book);
    }

    @PutMapping("/{bookId}")
    public void updateBook(@PathVariable int bookId, @RequestBody Book book) {
        Assert.isTrue(book.id == bookId, "book not found");
        service.updateBook(book);
    }

    @DeleteMapping("/{bookId}")
    public void removeBook(@PathVariable int bookId) {
        if (service.getBooks().stream().noneMatch(item -> Objects.equals(bookId, item.id))) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        service.getBooks().removeIf(book -> Objects.equals(book.id, bookId));
    }

    @DeleteMapping
    public void removeBooks(@RequestBody List<Integer> ids) {
        service.getBooks().removeIf(book -> ids.contains(book.getId()));
    }
}
