import React from "react";
import cn from "classnames";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { BsPencil } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href="/blog/write" className={styles.write}>
            <BsPencil />
            Написать блог
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
