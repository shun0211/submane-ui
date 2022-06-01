import { CalendarIcon, CurrencyYenIcon } from "@heroicons/react/solid";
import { Container, SimpleGrid } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Home.module.css";
import DefaultErrorPage from 'next/error'
import { Subscription } from "../../types";


const Subscriptions = () => {
  const router = useRouter();
  const { sid } = router.query;
  const [subscription, setSubscription] = useState<Subscription>()

  useEffect(() => {
    axios.get(`http://localhost:1323/subscriptions/${sid}`)
    .then((res) => res.data)
    .then((data: Subscription) => {
      setSubscription(data)
    })
    .catch(console.error)
  }, [])


  if (!subscription) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <div className={styles.Home}>
      <Sidebar />
      <Container mt={30} mb={30} size="lg">
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          spacing={50}
        >
          <div>
            <CurrencyYenIcon />
            <div>
              {subscription.price}
            </div>
          </div>
          <div>
            <CalendarIcon />
            aaa
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Subscriptions;
