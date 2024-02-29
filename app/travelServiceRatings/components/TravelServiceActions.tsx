import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const WorkerActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/travelServiceRatings/new">新增疗休养评份表</Link>
      </Button>
    </div>
  );
};

export default WorkerActions;
