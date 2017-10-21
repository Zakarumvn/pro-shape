package com.proshape.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * Properties specific to JHipster.
 * <p>
 * Properties are configured in the application.yml file.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    @Bean
    public MultipartResolver multipartResolver() {
        return new CommonsMultipartResolver();
    }
}
