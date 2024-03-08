import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const WorkerActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/travelServices/new">添加疗休养批次</Link>
      </Button>
    </div>
  );
};

export default WorkerActions;
