"use client";

import React, { useState, useEffect } from "react";
import "./Header.module.css";
import Link from "next/link";
import { Header_Links } from "@/data/ConstantData";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import classes from "./Header.module.css";
import { mergeClass } from "@/utils/HelperFunctions";
import useResponsiveHook from "@/hooks/useResponsiveHook";
import { Button } from "../Button";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

// react drawer
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const renderLinks = (link) => {
  return (
    <Link className={classes?.linkText} key={link?.title} href={link?.href}>
      <p className="p1">{link?.title}</p>
    </Link>
  );
};

export const Header = () => {
  let isMobile = useResponsiveHook(1200);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Container className={mergeClass("mt-4")}>
      <Row className={classes?.headerContainer}>
        <Col xs={3}>
          <div className={classes?.logoContainerStyle}>
            <Image src={"/images/Logo.png"} fill alt="logo" />
          </div>
        </Col>

        {isMobile ? (
          <>
            <Col xs={9}>
              <div className={classes?.drawerIcon}>
                <GiHamburgerMenu
                  className={classes?.drawerIcon}
                  fontSize={32}
                  onClick={toggleDrawer}
                  color="var(--primaryColor)"
                />
              </div>
            </Col>

            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="right"
              className={classes?.drawerClass}
            >
              <div className={classes?.rootContainer}>
                <div className={classes?.drawerImageCont}>
                  <Image alt="image" src={"/images/Logo.png"} fill />
                </div>
                <div className={classes?.linkRenderingDrawer}>
                  {Header_Links?.map((item, index) => {
                    return <div key={index}>{renderLinks(item)}</div>;
                  })}

                  {/* <div className={classes?.iconContainerDrawer}>
                    {iconsArray?.map((icon, index) => {
                      return <div key={index}>{icon?.iconjsx}</div>;
                    })}
                  </div> */}
                </div>
              </div>
            </Drawer>
          </>
        ) : (
          <>
            <Col xs={6}>
              <div className={classes.linksCont}>
                {Header_Links?.map((item, index) => {
                  return <div key={index}>{renderLinks(item)}</div>;
                })}
              </div>
            </Col>

            <Col xs={3}>
              <div className={classes?.divButtons}>
                <Button variant="outlined">Signin</Button>
                <Button variant="primary">Sign Up</Button>
              </div>
              {/* <div className={classes?.iconContainer}>
                {iconsArray?.map((icon, index) => {
                  return <div key={index}>{icon?.iconjsx}</div>;
                })}
              </div> */}
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

// icons array here can add label also

// const iconsArray = [
//   {
//     iconjsx: <VscAccount color="black" size={25} />,
//     label: "Account Alert",
//   },
//   {
//     iconjsx: <CiSearch color="black" size={25} />,
//     label: "Search",
//   },
//   {
//     iconjsx: <FaRegHeart color="black" size={25} />,
//     label: "heart",
//   },
//   {
//     iconjsx: <FaCartShopping color="black" size={25} />,
//     label: "cart shopping",
//   },
// ];
