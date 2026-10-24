'use client';

import React, { useState } from 'react';
import { ServiceDeliverable } from '@/data/services';

interface DeliverablesTabsProps {
  deliverables: ServiceDeliverable[];
}

export function DeliverablesTabs({ deliverables }: DeliverablesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = deliverables[activeIndex] || deliverables[0];

  return (
    <section className="Deliverables-module__rs733q__section" aria-label="What you get">
      <div className="Deliverables-module__rs733q__strip" role="tablist" aria-label="Deliverables">
        {deliverables.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className="Deliverables-module__rs733q__item"
              data-active={isActive ? 'true' : 'false'}
              onClick={() => setActiveIndex(idx)}
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                border: 'none',
                background: 'transparent',
              }}
            >
              <span className="Deliverables-module__rs733q__collapsed" aria-hidden={isActive}>
                <span className="Deliverables-module__rs733q__index">{item.index}</span>
                <span className="Deliverables-module__rs733q__mark" aria-hidden="true" />
                <span className="Deliverables-module__rs733q__stepLabel">{item.stepLabel}</span>
              </span>

              <span className="Deliverables-module__rs733q__expanded" aria-hidden={!isActive}>
                <svg
                  className="Deliverables-module__rs733q__ring"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle className="Deliverables-module__rs733q__ringTrack" cx="16" cy="16" r="13" />
                  <circle
                    className="Deliverables-module__rs733q__ringFill"
                    cx="16"
                    cy="16"
                    r="13"
                    strokeDasharray="81.6814"
                    strokeDashoffset="0"
                  />
                </svg>
                <span className="Deliverables-module__rs733q__cardTitle">{item.cardTitle}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="Deliverables-module__rs733q__reading">
        <h2 className="Deliverables-module__rs733q__readTitle">
          <span className="Deliverables-module__rs733q__readTitleLine" data-arriving="">
            {activeItem.cardTitle}
          </span>
        </h2>
        <div className="Deliverables-module__rs733q__readBodyStack">
          <p className="Deliverables-module__rs733q__readBody" data-arriving="">
            {activeItem.readBody}
          </p>
        </div>
      </div>
    </section>
  );
}
