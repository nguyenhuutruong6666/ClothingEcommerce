package com.project.ClothingEcommerceWebsite.configs;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${spring.cloudinary.cloud-name:dbtxqph5h}")
    private String cloudName;

    @Value("${spring.cloudinary.api-key:265477179784944}")
    private String apiKey;

    @Value("${spring.cloudinary.api-secret:0V1vgEYMIZQ6LBImGzIgNqt24wM}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }
}
