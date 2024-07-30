"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import useResponsiveHook from "@/hooks/useResponsiveHook";

export const LandingPage = () => {
  const mobileHook = useResponsiveHook(768);

  return (
    <Container>
      <Row></Row>
    </Container>
  );
};
