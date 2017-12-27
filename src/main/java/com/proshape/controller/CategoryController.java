package com.proshape.controller;

import com.proshape.domain.Category;
import com.proshape.domain.Exhib;
import com.proshape.domain.Model;
import com.proshape.service.CategoryService;
import com.proshape.service.FileService;
import com.proshape.web.rest.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cat")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    FileService fileService;

    @GetMapping(value = "/getById")
    public Category getCategoryById(@RequestParam("categoryId") Long categoryId){
        return categoryService.getCategoryById(categoryId);
    }

    @GetMapping(value = "/getAll")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping(value = "/getAllByType")
    public List<Category> getAllByType(String type){
        return categoryService.getAllByType(type);
    }

    @PostMapping(value = "/createCategory")
    public void createCategory(@RequestBody Category newCategory){
        categoryService.createCategory(newCategory.getName(), newCategory.getDescription(), newCategory.getType());
    }

    @PostMapping(value = "/updateCategoryNames")
    public void updateCategoryNames(@RequestBody Category editCategory){
        categoryService.updateCategoryNames(editCategory.getCategoryId(), editCategory.getName(), editCategory.getDescription());
    }

    @PostMapping(value = "/deleteCategory")
    public void deleteCategory(@RequestBody Category delCategory){
        categoryService.deleteCategory(delCategory.getCategoryId());
    }

    @GetMapping(value = "/getModels")
    public ResponseEntity<List<Model>> getModels(@RequestParam("size") Integer size, @RequestParam("sort") String sort, @RequestParam("page") Integer pageNr, @RequestParam("categoryId") Long category){
        Pageable pageable = new PageRequest(pageNr, size);
        final Page<Model> page = categoryService.findModelsByCategory(category, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cat/getModels");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping(value = "/getExhibs")
    public ResponseEntity<List<Exhib>> getExhibs(@RequestParam("size") Integer size, @RequestParam("sort") String sort, @RequestParam("page") Integer pageNr, @RequestParam("categoryId") Long category){
        Pageable pageable = new PageRequest(pageNr, size);
        final Page<Exhib> page = categoryService.findExhibsByCategory(category, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cat/getExhibs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
