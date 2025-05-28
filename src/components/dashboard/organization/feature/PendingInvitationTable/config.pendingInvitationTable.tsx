"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";
import type { TeamInvitationSelectSchema } from "~/server/db/schema/team_invitation";

import { toast } from "sonner";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
// Components
// import { Badge } from "~/components/ui/badge";
import { formatDate } from "~/utils/dateHandler";
import { formatRole } from "~/utils/formatRole";

import { Button } from "~/components/ui/button";
import { role as Role } from "~/server/db/schema/role";

export const PendingInvitationTableConfig: ColumnDef<
  z.infer<typeof TeamInvitationSelectSchema>
>[] = [
  {
    accessorKey: "userMail",
    header: "Name",
    cell: ({ row }) => {
      const { userMail } = row.original;
      return (
        <section className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="text-xs">
              {userMail.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <section>
            <p className="text-xs">{userMail}</p>
          </section>
        </section>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Invited At",
    cell: ({ row }) => {
      const invitedAt = row.original.createdAt;
      return formatDate(invitedAt);
    },
  },
  
];
