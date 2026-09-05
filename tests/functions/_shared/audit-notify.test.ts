import { describe, it, expect } from 'vitest';
import { flipOverdueRecommendations, createNotification } from '../../../functions/_shared/notify';
import { writeAuditLog } from '../../../functions/_shared/audit-log';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';

const DUE_SELECT =
  "SELECT id, finding_id FROM recommendations WHERE status IN ('open','in_progress') AND due_date < ?";
const FLIP_UPDATE = "UPDATE recommendations SET status = 'overdue' WHERE id = ?";
const NOTIFY_INSERT =
  'INSERT INTO notifications (id, user_id, type, payload_json, read, created_at) VALUES (?, ?, ?, ?, 0, ?)';
const AUDIT_INSERT =
  'INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';

describe('flipOverdueRecommendations', () => {
  it('flips only past-due open/in_progress recommendations and returns their ids', async () => {
    const env = mockEnv({
      db: makeD1([
        { sql: DUE_SELECT, all: { results: [{ id: 'r1', finding_id: 'f1' }, { id: 'r2', finding_id: 'f1' }] } },
        { sql: FLIP_UPDATE, run: {} },
      ]),
    });
    const flipped = await flipOverdueRecommendations(env);
    expect(flipped).toEqual(['r1', 'r2']);
  });

  it('returns an empty list when nothing is due', async () => {
    const env = mockEnv({
      db: makeD1([{ sql: DUE_SELECT, all: { results: [] } }]),
    });
    expect(await flipOverdueRecommendations(env)).toEqual([]);
  });
});

describe('createNotification', () => {
  it('inserts an unread notification row', async () => {
    const env = mockEnv({ db: makeD1([{ sql: NOTIFY_INSERT, run: {} }]) });
    await expect(
      createNotification(env, 'u1', 'finding_assigned', { finding_id: 'f1' }),
    ).resolves.toBeUndefined();
  });
});

describe('writeAuditLog', () => {
  it('inserts an audit_log row with serialized meta', async () => {
    const env = mockEnv({ db: makeD1([{ sql: AUDIT_INSERT, run: {} }]) });
    await expect(
      writeAuditLog(env, {
        userId: 'u1',
        action: 'create',
        entity: 'finding',
        entityId: 'f1',
        meta: { severity: 'high' },
      }),
    ).resolves.toBeUndefined();
  });
});
