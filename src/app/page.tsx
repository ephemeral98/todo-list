'use client';

import Image from 'next/image';
import styles from './page.module.css';
import 'uno.css';
import ScrollList from "@cps/ScrollList"

export default function Home() {
  return (
    <div>
      Lorem ipsum dolor sit.
      <ScrollList></ScrollList>
    </div>
  );
}
