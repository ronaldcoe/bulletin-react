-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "fk_rails_03de2dc08c";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "fk_rails_9f58e90430";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "fk_rails_1e09b5dabf";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "fk_rails_21ee0d1bf3";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "fk_rails_03de2dc08c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "fk_rails_9f58e90430" FOREIGN KEY ("discussion_thread_id") REFERENCES "discussion_threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "fk_rails_1e09b5dabf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "fk_rails_21ee0d1bf3" FOREIGN KEY ("discussion_thread_id") REFERENCES "discussion_threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
