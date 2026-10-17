import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const ContentModeration = () => {
  const [flaggedItems, setFlaggedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [feedback, setFeedback] = useState(null);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/moderation/queue');
      if (Array.isArray(res.data)) {
        setFlaggedItems(res.data);
      }
    } catch (err) {
      console.error('Error fetching moderation queue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleAction = async (itemId, action) => {
    try {
      await axiosInstance.post(`/admin/moderation/${itemId}/action`, {
        action,
      });
      setFeedback(`Action '${action}' applied to incident.`);
      setFlaggedItems((prev) => prev.filter((item) => item.id !== itemId));
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error('Error applying moderation action:', err);
      setFlaggedItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const tagStyles = {
    rose: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
    sand: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      border: '1px solid #fde68a',
    },
  };

  const filteredItems = flaggedItems.filter((item) => {
    const matchesSearch =
      item.content?.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {/* Left Column: Flagged Content Queue */}
      <div
        style={{
          flex: 1,
          minWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {feedback && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid #a7f3d0',
            }}
          >
            {feedback}
          </div>
        )}

        {/* Filter Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '13px', padding: '8px 16px' }}
            >
              All Queue ({flaggedItems.length})
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface)',
              padding: '8px 14px',
              minWidth: '200px',
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: '18px',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              search
            </span>
            <input
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-on-surface)',
                width: '100%',
              }}
              placeholder="Search incidents..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            Loading moderation queue...
          </div>
        ) : filteredItems.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '48px',
              textAlign: 'center',
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{ fontSize: '48px', color: 'var(--color-primary)' }}
            >
              task_alt
            </span>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '12px' }}>Queue is Clear</h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-on-surface-variant)',
                marginTop: '4px',
              }}
            >
              All flagged posts and clinical triage alerts have been reviewed.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: 'var(--shadow-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-surface-container)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: 'var(--color-on-surface)',
                    }}
                  >
                    {item.user?.initials || 'U'}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-on-surface)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.user?.name || '@user'}
                    </h3>
                    <p
                      style={{
                        fontSize: '11px',
                        color: 'var(--color-on-surface-variant)',
                      }}
                    >
                      Posted {item.user?.time || 'recently'} · {item.user?.source || 'Community'}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        ...(tagStyles[tag.variant] || tagStyles.rose),
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-surface-container)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  color: 'var(--color-on-surface)',
                }}
              >
                "{item.content}"
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleAction(item.id, 'approve')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      border: '1px solid #a7f3d0',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                      check_circle
                    </span>{' '}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'remove')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      border: '1px solid #fecaca',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                      delete
                    </span>{' '}
                    Remove
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'escalate')}
                    className="btn-primary"
                    style={{ fontSize: '13px', padding: '8px 16px' }}
                  >
                    Escalate to Clinical Safety
                  </button>
                </div>
                <button
                  onClick={() => handleAction(item.id, 'suspend')}
                  className="btn-secondary"
                  style={{
                    fontSize: '13px',
                    padding: '8px 16px',
                    borderColor: '#ef4444',
                    color: '#b91c1c',
                  }}
                >
                  Suspend User
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Column: Safety Guidelines */}
      <aside
        style={{
          width: '340px',
          flexShrink: 0,
          position: 'sticky',
          top: '88px',
          alignSelf: 'flex-start',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>
            Moderation Protocol
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              lineHeight: '1.6',
              marginBottom: '16px',
            }}
          >
            All content on SarvUday is screened for community safety and medical integrity. Critical
            self-harm or harassment triggers immediate triage alerts.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12px',
            }}
          >
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
              }}
            >
              • Immediate clinical escalation for distress signals
            </div>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: '#f0fdf4',
                color: '#166534',
              }}
            >
              • Respectful recovery &amp; support discussions permitted
            </div>
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: '#fffbeb',
                color: '#92400e',
              }}
            >
              • Strict ban on unauthorized medication recommendations
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ContentModeration;
