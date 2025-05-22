'use client';

import React from 'react';
import { api } from '~/trpc/react';

// table config
import { PendingInvitationTableConfig } from './config.pendingInvitationTable';

// table utils
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// icons
import { AddIcon } from 'public/icons';

import { InviteMemberFormDialog } from '~/components/form/team/InviteMember/InviteMemberFormDialog';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface TeamMemberInvitationTableProps {
  teamSlug: string;
}

export const PendingInvitationTable: React.FC<
  TeamMemberInvitationTableProps
> = ({ teamSlug }) => {
  const { data: allTeamUsers, isLoading } = api.team.getAllInvitations.useQuery(
    {
      teamSlug,
    },
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: allTeamUsers?.data ?? [],
    columns: PendingInvitationTableConfig,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination((old) => {
        const newPagination =
          typeof updater === 'function' ? updater(old) : updater;
        return newPagination;
      });
    },
  });

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    setPagination((old) => ({ ...old, pageSize: newPageSize }));
    table.setPageSize(newPageSize);
  };

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="min-w-fit text-sm">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {Array.from({ length: headerGroup.headers.length }).map(
                    (_, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <TableCell key={index} className="min-w-fit text-sm">
                        <Skeleton className="h-5 min-w-fit" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))}
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {Array.from({ length: headerGroup.headers.length }).map(
                    (_, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <TableCell key={index} className="min-w-fit text-sm">
                        <Skeleton className="h-5 min-w-fit" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))}
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {Array.from({ length: headerGroup.headers.length }).map(
                    (_, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <TableCell key={index} className="min-w-fit text-sm">
                        <Skeleton className="h-5 min-w-fit" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={PendingInvitationTableConfig.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="py-3 bg-transparent! group-hover:bg-transparent">
                <TableCell
                  colSpan={PendingInvitationTableConfig.length}
                  className="border-b "
                >
                  <InviteMemberFormDialog
                    teamSlug={teamSlug}
                    trigger={
                      <Button
                        variant="ghost"
                        size="default"
                        className="w-full text-xs"
                      >
                        <AddIcon /> Invite Member
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end p-2">
        <div className="flex items-center space-x-2">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <div className="grid gap-6">
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Page size" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};
