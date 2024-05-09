import DialogContent from "@/components/ai/dialog/DialogContent";
import React from "react";

const DialogWithAIPage = ({ params }: { params: { id: string } }) => {
  return <DialogContent params={params} />;
};

export default DialogWithAIPage;
