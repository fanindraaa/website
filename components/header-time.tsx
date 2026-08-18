'use client';

import { useEffect, useState } from 'react';

export default function HeaderTime() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time like "7:25:37 PM"
      const formatted = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[13px] text-sand-10 tabular-nums select-none">
      Bengaluru, India {timeStr || '7:25:37 PM'}
    </div>
  );
}
