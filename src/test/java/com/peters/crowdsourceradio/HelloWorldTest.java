package com.peters.crowdsourceradio.integration;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.peters.crowdsourceradio.controllers.HelloWorldController;

@SpringBootTest
public class HelloWorldTest {

	@Autowired
	private HelloWorldController controller;

	@Test
	public void contextLoads() {
			assertThat(controller).isNotNull();
	}

}