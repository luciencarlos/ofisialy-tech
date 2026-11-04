"use client";

import { Button, type ButtonVariant } from "./Button";
import { prefillOrder } from "@/lib/order";

/** Lien vers le formulaire qui présélectionne aussi la pièce demandée. */
export function PickButton({
  optionId,
  note,
  variant,
  children,
}: {
  optionId: string;
  note?: string;
  variant: ButtonVariant;
  children: React.ReactNode;
}) {
  return (
    <Button variant={variant} href="#commande" onClick={() => prefillOrder(optionId, note)}>
      {children}
    </Button>
  );
}
