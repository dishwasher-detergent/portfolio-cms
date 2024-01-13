"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Portfolios } from "@/interfaces/portfolios";
import { database_service } from "@/lib/appwrite";
import { PORTFOLIO_COLLECTION_ID } from "@/lib/constants";
import { usePortfolioStore } from "@/store/zustand";
import { LucidePlus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";

export const PortfoliosSelect = () => {
  const { current, update } = usePortfolioStore();
  const router = useRouter();
  const params = useParams();

  const [portfolios, setPortfolios] = useState<Portfolios[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPortfolios() {
      if (!current) return;

      setLoading(true);

      const res = await database_service.list<Portfolios>(
        PORTFOLIO_COLLECTION_ID,
      );

      setPortfolios(res.documents);
      setLoading(false);
    }

    fetchPortfolios();
  }, [current]);

  useEffect(() => {
    usePortfolioStore.persist.rehydrate();
  }, []);

  return !loading ? (
    <Select
      onValueChange={(e) => {
        const data = JSON.parse(e);

        update(data);
        router.push(`/${data.id}`);
      }}
      value={`{"id": "${current?.id}", "title": "${current?.title}"}`}
    >
      <SelectTrigger className="w-36 truncate bg-background">
        <SelectValue
          placeholder="Select a Portfolio"
          defaultValue={params.port_slug}
        />
      </SelectTrigger>
      <SelectContent>
        {portfolios.map((item) => (
          <SelectItem
            key={item.$id}
            value={`{"id": "${item.$id}", "title": "${item.title}"}`}
          >
            {item.title}
          </SelectItem>
        ))}
        <Button asChild>
          <Link href={`/portfolio/create`} className="mt-2 w-full">
            <LucidePlus className="mr-2 h-4 w-4" />
            Add
          </Link>
        </Button>
      </SelectContent>
    </Select>
  ) : (
    <Skeleton className="h-9 w-36" />
  );
};
