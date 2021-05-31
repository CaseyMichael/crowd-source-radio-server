
package com.peters.crowdsourceradio.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/healthcheck")
    String heathcheck() {
        return "Hello World";
    }

}