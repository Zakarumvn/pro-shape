package com.proshape.controller;

import com.proshape.domain.Category;
import com.proshape.domain.Exhib;
import com.proshape.domain.Model;
import com.proshape.service.CategoryService;
import com.proshape.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Model> getModels(@RequestParam("categoryId") Long category){
        return categoryService.findModelsByCategory(Long.valueOf(category));
    }

    @GetMapping(value = "/getExhibs")
    public List<Exhib> getExhibs(@RequestParam("categoryId") Long category){
        return categoryService.findExhibsByCategory(Long.valueOf(category));
    }
}
