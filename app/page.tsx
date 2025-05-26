'use client'

import { mockCategoryList, mockPartyList, mockEventList } from "./mock";
import { useEffect, useMemo, useState } from "react";
import { ICategory, IParty, IEvent } from "./types/party";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Event from "./components/Event";

export default function Home() {
  const [categories, setCategories] = useState<ICategory[]>(mockCategoryList);
  const [parties, setParties] = useState<IParty[]>(mockPartyList);
  const [events, setEvents] = useState<IEvent[]>(mockEventList);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const selectedEvents = useMemo(() => {
    if (!selectedCategoryId) return events;
    return events.filter(event => event.category.id === selectedCategoryId);
  }, [selectedCategoryId, events])

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories])

  return (
    <div className="px-8 py-8">
      <header className="px-8">
        <Input placeholder="搜索..." />
      </header>

      <Tabs className="justify-center flex-row my-4" value={selectedCategoryId} onValueChange={(value) => setSelectedCategoryId(value)}>
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <main className="flex flex-wrap gap-4 justify-center">
        {selectedEvents.map((event: IEvent) => (
          <Event key={event.id} data={event} />
        ))}
      </main>
    </div>
  );
}
