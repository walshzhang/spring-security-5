package ilearn.spring.security;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    private List<Book> books;

    public BookService() {
        this.books = new ArrayList<>();
        books.add(new Book(1, "book1", 10));
    }

    public List<Book> getBooks() {
        return books;
    }

    public void newBook(Book book) {
        book.setId(books.size() + 1);
        books.add(book);
    }

    public Book getBook(int bookId) {
        return books.stream()
                .filter(book -> book.getId() == bookId)
                .findFirst().orElseThrow(() -> new RuntimeException("not found"));
    }

    public void updateBook(Book book) {
        books = books.stream()
                .map(b -> book.getId() == book.getId() ? book : b)
                .collect(Collectors.toList());
    }
}
