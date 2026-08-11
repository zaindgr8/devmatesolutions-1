import React, { useEffect, useRef, useState } from "react";

const stats = [
  {
    id: 1,
    number: 2019,
    prefix: "",
    suffix: "",
    display: "2019",
    label: "Founded",
    sub: "Building since day one",
    icon: "fal fa-rocket",
  },
  {
    id: 2,
    number: 40,
    prefix: "",
    suffix: "+",
    display: "40+",
    label: "Global Brands",
    sub: "Across 6 continents",
    icon: "fal fa-globe",
  },
  {
    id: 3,
    number: 25,
    prefix: "",
    suffix: "+",
    display: "25+",
    label: "Industries Served",
    sub: "From AI to Real Estate",
    icon: "fal fa-layer-group",
  },
  {
    id: 4,
    number: 96,
    prefix: "",
    suffix: "%",
    display: "96%",
    label: "Client Satisfaction",
    sub: "Rated by verified clients",
    icon: "fal fa-star",
  },
];

// Animated counter hook
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatItem = ({ stat, index, isVisible }) => {
  const count = useCounter(stat.number, 1600 + index * 200, isVisible);
  const display =
    stat.id === 1
      ? isVisible ? stat.display : "—"
      : `${stat.prefix}${count}${stat.suffix}`;

  return (
    <div className={`dm-stat-item dm-stat-item--${index}`}>
      <div className="dm-stat-icon">
        <i className={stat.icon}></i>
      </div>
      <div className="dm-stat-content">
        <div className="dm-stat-number">{display}</div>
        <div className="dm-stat-label">{stat.label}</div>
        {/* <div className="dm-stat-sub">{stat.sub}</div> */}
      </div>
    </div>
  );
};

const FeatureLists = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .dm-stats-section {
          background: #0d0d0d;
          position: relative;
          overflow: hidden;
          padding: 0;
        }

        /* subtle grid pattern */
        .dm-stats-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* red top accent line */
        .dm-stats-section::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c0392b, #e74c3c, #c0392b);
        }

        .dm-stats-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 991px) {
          .dm-stats-inner { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 575px) {
          .dm-stats-inner { grid-template-columns: repeat(2, 1fr); }
        }

        .dm-stat-item {
          padding: 44px 40px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: flex-start;
          gap: 18px;
          position: relative;
          transition: background 0.3s ease;
          cursor: default;
        }

        .dm-stat-item:last-child {
          border-right: none;
        }

        .dm-stat-item:hover {
          background: rgba(192,57,43,0.07);
        }

        /* bottom border on mobile for top row */
        @media (max-width: 991px) {
          .dm-stat-item--0,
          .dm-stat-item--1 {
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .dm-stat-item--1,
          .dm-stat-item--3 {
            border-right: none;
          }
        }

        .dm-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(192,57,43,0.12);
          border: 1px solid rgba(192,57,43,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 17px;
          color: #c0392b;
          transition: all 0.3s ease;
        }

        .dm-stat-item:hover .dm-stat-icon {
          background: rgba(192,57,43,0.2);
          border-color: rgba(192,57,43,0.4);
          color: #e74c3c;
        }

        .dm-stat-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dm-stat-number {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -1px;
          font-variant-numeric: tabular-nums;
          transition: color 0.3s ease;
        }

        .dm-stat-item:hover .dm-stat-number {
          color: #c0392b;
        }

        .dm-stat-label {
          font-size: 13px;
          font-weight: 700;
          color: #e5e7eb;
          letter-spacing: 0.2px;
          margin-top: 4px;
        }

        .dm-stat-sub {
          font-size: 11.5px;
          color: #6b7280;
          font-weight: 400;
          margin-top: 2px;
        }

        @media (max-width: 767px) {
          .dm-stat-item {
            padding: 32px 24px;
            gap: 14px;
          }
          .dm-stat-icon {
            width: 38px;
            height: 38px;
            font-size: 15px;
          }
          .dm-stat-sub { display: none; }
        }
      ` }} />

      <div className="dm-stats-section" ref={ref}>
        <div className="dm-stats-inner">
          {stats.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureLists;
