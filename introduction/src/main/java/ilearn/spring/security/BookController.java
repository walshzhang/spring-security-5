package ilearn.spring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Controller
@CrossOrigin("*")
@RequestMapping("/books")
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public String getAllBooks(Model model) {
        List<Book> books = service.getBooks();
        model.addAttribute("books", books);
        return "list";
    }

    @GetMapping("/{bookId}")
    public String getBook(@PathVariable int bookId,
                          Model model) {
        model.addAttribute("book",
                service.getBook(bookId));
        return "details";
    }

    @GetMapping("/addForm")
    public String addNewBookForm() {
        return "add";
    }

    @PostMapping("add")
    public String addNewBook(Book book) {
        service.newBook(book);
        return "redirect:/books";
    }

    @GetMapping("/updateForm/{bookId}")
    public String editForm(@PathVariable int bookId,
                           Model model) {
        model.addAttribute("book", service.getBook(bookId));
        return "edit";
    }

    @PostMapping("/update/{bookId}")
    public String updateBook(@PathVariable int bookId, Book book) {
        Assert.isTrue(book.id == bookId, "book not found");
        service.updateBook(book);
        return "redirect:/books";
    }

    @PostMapping("/remove/{bookId}")
    public String removeBook(@PathVariable int bookId) {
        service.getBooks().removeIf(book -> Objects.equals(book.id, bookId));
        return "redirect:/books";
    }

    @PostMapping("/remove")
    public String removeBooks(@RequestBody List<Integer> ids) {
        service.getBooks().removeIf(book -> ids.contains(book.getId()));
        return "redirect:/books";
    }
}
