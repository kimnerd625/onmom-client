"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CopyIcon from "@/public/icons/copy-fill.svg";
import { getInviteCode } from "@/app/actions/inviteCodeActions";
import ClientInviteCodeContent from "./ClientInviteCodeContent";

interface InviteCodeContentProps {
  groupId: string;
}

const InviteCodeContent = async ({ groupId }: InviteCodeContentProps) => {
  try {
    const inviteCode = await getInviteCode(groupId);
    return <ClientInviteCodeContent inviteCode={inviteCode} />;
  } catch (error) {
    return <ClientInviteCodeContent error={(error as Error).message} />;
  }
};

export default InviteCodeContent;
