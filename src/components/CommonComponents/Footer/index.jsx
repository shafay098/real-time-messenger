"use client";

import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Input from "../Input";
import classes from "./Footer.module.css";
import { Button } from "../Button";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const [email, setEmail] = useState("");

  function listItems(linksObject) {
    return (
      <div className={classes?.listRootContainer}>
        <h6 className={classes?.titleLink}>{linksObject?.headerLink}</h6>
        <ul className={classes?.listContainer}>
          {linksObject?.links?.map((item, index) => {
            return (
              <li key={index}>
                <Link className={classes?.linkStyle} href={item?.href}>
                  {item?.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <Container fluid className={classes?.footerRootCont}>
      <Container>
        <Row>
          <Col className="mt-5" xxl={3} xl={3} lg={12} xs={12}>
            <div className={classes?.firstColDiv}>
              <h3 className={classes?.headingLogo}>
                <Image
                  src={"/images/Logo.png"}
                  height={25}
                  width={116}
                  alt="logo"
                />
              </h3>

              <div className={classes?.detailRootDiv}>
                <div className={classes?.detailDiv}>
                  <HiOutlineLocationMarker size={24} />
                  <p className="p4-light">
                    25566 Hc 1, Glenallen, Alaska, 99588, USA
                  </p>
                </div>

                <div className={classes?.detailDiv}>
                  <BsTelephone size={24} />
                  <p className="p4-light">+603 4784 273 12</p>
                </div>

                <div className={classes?.detailDiv}>
                  <CiMail size={24} />
                  <p className="p4-light">rentcars@gmail.com</p>
                </div>
              </div>
            </div>
          </Col>

          <Col className="mt-5" xxl={2} xl={2} lg={4} md={4} sm={4} xs={6}>
            {listItems(linksObject1)}
          </Col>

          <Col className="mt-5" xxl={2} xl={2} lg={4} md={4} sm={4} xs={6}>
            {listItems(linksObject2)}
          </Col>

          <Col className="mt-5" xxl={2} xl={2} lg={4} md={4} sm={4} xs={6}>
            {listItems(linksObject2)}
          </Col>

          <Col className="mt-5" xxl={3} xl={3} lg={4} md={4} sm={4} xs={12}>
            {
              <div className={classes?.newsletterDiv}>
                <p className={classes?.paraText}>Follow us</p>
                <div className={classes?.subscribeCont}>
                  <FaFacebook size={24} />
                  <FaInstagram size={24} />
                  <FaYoutube size={24} />
                </div>
              </div>
            }
          </Col>
        </Row>
        <Row>
          <hr className={classes?.hrLineStyle} />

          <Col xs={12}>
            <div className={classes?.lastFooterSecCont}>
              <h6 className={classes?.paraLast}>
                Copyright 2023 ・ Rentcars, All Rights Reserved
              </h6>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

let linksObject1 = {
  headerLink: "Our Product",
  links: [
    { title: "Career", href: "/" },
    { title: "Car", href: "/" },
    { title: "Packages", href: "/" },
    { title: "Features", href: "/" },
    { title: "Priceline", href: "/" },
  ],
};

let linksObject2 = {
  headerLink: "Resources",
  links: [
    { title: "Download", href: "/" },
    { title: "Help Centre", href: "/" },
    { title: "Guides", href: "/" },
    { title: "Partner Network", href: "/" },
    { title: "Cruises", href: "/" },
    { title: "Developer", href: "/" },
  ],
};

let linksObject3 = {
  headerLink: "About Rentcars",
  links: [
    { title: "Why choose us", href: "/" },
    { title: "Our Story", href: "/" },
    { title: "Investor Relations", href: "/" },
    { title: "Press Center", href: "/" },
    { title: "Advertise", href: "/" },
  ],
};
