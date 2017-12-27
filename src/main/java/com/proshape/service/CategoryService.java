package com.proshape.service;

import com.proshape.domain.Category;
import com.proshape.domain.Exhib;
import com.proshape.domain.Model;
import com.proshape.repository.CategoryRepository;
import com.proshape.repository.ExhibRepository;
import com.proshape.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    ExhibRepository exhibRepository;

    @Autowired
    ModelRepository modelRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public Category getCategoryById(Long categoryId){
        return categoryRepository.findOne(categoryId);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getAllByType(String type){
        return categoryRepository.findAllByType(type);
    }

    public void deleteCategory(Long categoryId){
        Category category = categoryRepository.findByCategoryId(categoryId);
        if(category != null){
            categoryRepository.delete(categoryId);
        }
    }

    public Category createCategory(String name, String description, String type){
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        category.setType(type);

        categoryRepository.save(category);
        return category;
    }

    public Category updateCategoryNames(Long categoryId, String name, String description){
        Category category = categoryRepository.findByCategoryId(categoryId);
        category.setName(name);
        category.setDescription(description);

        categoryRepository.save(category);
        return category;
    }

    public Page<Model> findModelsByCategory(Long categoryId, Pageable pageable){
        Category category = categoryRepository.getOne(categoryId);
        return modelRepository.findAllByCategory(category, pageable);
    }

    public Page<Exhib> findExhibsByCategory(Long categoryId, Pageable pageable){
        Category category = categoryRepository.getOne(categoryId);
        return exhibRepository.findAllByCategory(category, pageable);
    }

}
