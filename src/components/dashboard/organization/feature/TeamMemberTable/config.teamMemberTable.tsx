"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
// Components
// import { Badge } from "~/components/ui/badge";
import type { TeamUserSelectSchema } from "~/server/db/schema/team_user";
import { formatDate } from "~/utils/dateHandler";
import { formatRole } from "~/utils/formatRole";

import { role as Role } from "~/server/db/schema/role";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export const TeamMemberTableConfig: ColumnDef<
  z.infer<typeof TeamUserSelectSchema>
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
  // {
  //   accessorKey: "role",
  //   header: "Role",
  //   cell: ({ row }) => {
  //     const { role } = row.original;
  //     return <Badge variant="outline">{formatRole(role)}</Badge>;
  //   },
  // },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const { role, id } = row.original;

      const utils = api.useUtils();

      // mutations
      const revokeInvitationMutation = api.team.revokeInvitation.useMutation({
        onSuccess: () => {
          utils.team.getAllInvitations.invalidate();
          utils.team.getUserParticipatedTeams.invalidate();
        },
      });
      const updateRoleMutation = api.team.updateRoleInInvitation.useMutation({
        onSuccess: () => {
          utils.team.getAllInvitations.invalidate();
          utils.team.getUserParticipatedTeams.invalidate();
        },
      });

      const handleUpdateRole = async (role: "TEAM_MEMBER" | "TEAM_ADMIN") => {
        return toast.promise(
          updateRoleMutation.mutateAsync({
            invitationId: row.original.id,
            role,
          }),
          {
            loading: "Updating role...",
            success: "Role updated successfully",
            error: "Failed to update role",
          },
        );
      };

      const handleRevokeInvitation = async () => {
        return toast.promise(
          revokeInvitationMutation.mutateAsync({
            invitationId: id,
          }),
          {
            loading: "Revoking invitation...",
            success: "Invitation revoked successfully",
            error: "Failed to revoke invitation",
          },
        );
      };

      return (
        <section className="flex gap-2">
          <Select
            defaultValue={role}
            onValueChange={async (role: "TEAM_MEMBER" | "TEAM_ADMIN") => {
              await handleUpdateRole(role);
            }}
          >
            <SelectTrigger
              className="w-[200px]"
              // disabled={role === Role.ORG_ADMIN}
              disabled={
                updateRoleMutation.status === "pending" ||
                revokeInvitationMutation.status === "pending" ||
                role === Role.enumValues["0"]
              }
            >
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {role === Role.enumValues["0"] && (
                <SelectItem value={Role.enumValues["0"]}>
                  {formatRole(Role.enumValues["0"])}
                </SelectItem>
              )}
              <SelectItem value={Role.enumValues["1"]}>
                {formatRole(Role.enumValues["1"])}
              </SelectItem>
              <SelectItem value={Role.enumValues["2"]}>
                {formatRole(Role.enumValues["2"])}
              </SelectItem>
            </SelectContent>
          </Select>

          {role !== Role.enumValues["0"] && (
            <Button
              // size="sm"
              variant="destructive"
              onClick={handleRevokeInvitation}
              disabled={
                updateRoleMutation.status === "pending" ||
                revokeInvitationMutation.status === "pending"
              }
            >
              Revoke
            </Button>
          )}
        </section>
      );
    },
  },
];
