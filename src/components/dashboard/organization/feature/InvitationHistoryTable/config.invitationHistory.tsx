"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";
import type { TeamInvitationSelectSchema } from "~/server/db/schema/team_invitation";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
// Components
import { Badge } from "~/components/ui/badge";
import { formatDate } from "~/utils/dateHandler";
import { formatRole } from "~/utils/formatRole";

export const InvitationHistoryTableConfig: ColumnDef<
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
      const { createdAt } = row.original;
      return <p className="text-xs font-medium">{formatDate(createdAt)}</p>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const { role } = row.original;

      return <Badge variant="outline">{formatRole(role)}</Badge>;
    },
  },

  {
    accessorKey: "invitationStatus",
    header: "Invitation Status",
    cell: ({ row }) => {
      const { invitationStatus } = row.original;

      return <Badge variant="outline">{invitationStatus}</Badge>;
    },
  },
];
