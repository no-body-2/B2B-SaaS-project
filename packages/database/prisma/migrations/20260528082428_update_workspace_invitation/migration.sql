/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `workspace_invitations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workspace_id,target_email,status]` on the table `workspace_invitations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `workspace_invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workspace_invitations" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "workspace_invitations_token_key" ON "workspace_invitations"("token");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_invitations_workspace_id_target_email_status_key" ON "workspace_invitations"("workspace_id", "target_email", "status");
