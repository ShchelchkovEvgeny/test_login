"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/auth";
import { useEffect, useState } from "react";
import { getCards } from "@/lib/api";
import { redirect, useRouter } from "next/navigation";

type CardItem = {
  id: number;
  title: string;
  description: string;
};

export default function HomePage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<CardItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (user && user.status === "logged") {
      setLoading(false);
      getCards().then((response) => {
        setCards(response.data);
      });
    } else if (!user || user.status === "guest") {
      redirect("/login");
    } else {
      setLoading(true);
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, router]);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ alignSelf: "center", margin: "50px" }}>Загрузка...</h3>
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "20px",
          width: "60px",
        }}
      >
        <a>Привет, {user.data?.name}</a>
        <Button style={{ marginTop: "10px" }} onClick={logout}>
          Выйти
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {cards.map((card) => (
          <Card
            style={{ marginLeft: "65px", marginTop: "-23px" }}
            key={card.id}
            className="p-4"
          >
            <h2>{card.title}</h2>
            <p style={{ marginTop: "-15px", width: "80%" }}>
              {card.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
