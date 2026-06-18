"use client";

import { Button } from "@/components/Button";

export function DeleteProjectButton() {
   return (
      <Button
         type="submit"
         variant="secondary"
         onClick={(event) => {
            if (!window.confirm("Delete this project? This action cannot be undone.")) {
               event.preventDefault();
            }
         }}
      >
         Delete project
      </Button>
   );
}