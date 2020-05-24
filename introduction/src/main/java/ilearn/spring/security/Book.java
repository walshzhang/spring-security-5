package ilearn.spring.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Book {
    int id;
    String title;
    double price;
}
