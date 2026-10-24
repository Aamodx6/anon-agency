'use client';

import React, { useEffect, useRef } from 'react';

export function CaseThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    let totalLength = 11251.2;
    try {
      totalLength = path.getTotalLength() || 11251.2;
    } catch (e) {}

    const handleScroll = () => {
      const stage = svg.parentElement;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through stage
      const stageTop = rect.top;
      const stageHeight = rect.height;
      
      const start = windowHeight * 0.7;
      const end = -stageHeight * 0.5;

      const progress = Math.max(0, Math.min(1, (start - stageTop) / (start - end)));

      const drawn = progress * totalLength;
      path.style.strokeDasharray = `${drawn} ${totalLength + 1}`;
      path.style.strokeDashoffset = '0';
      path.style.visibility = drawn > 10 ? 'visible' : 'hidden';

      // Dynamic responsive stroke width
      const strokeW = Math.min(40, Math.max(16, (2.2 * window.innerWidth) / 100));
      path.style.strokeWidth = `${strokeW}px`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="CaseThread-module__fQt_la__svg"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 1440 1749"
    >
      <path
        ref={pathRef}
        className="CaseThread-module__fQt_la__path"
        d="M-63.4 0.0C-48.0 0.0 0.7 -10.6 28.8 0.0C56.9 10.6 81.2 67.2 105.1 63.3C129.0 59.4 146.1 -1.6 172.2 -23.6C198.3 -45.6 230.4 -61.8 261.8 -68.8C293.2 -75.7 328.5 -74.4 360.5 -65.0C392.4 -55.7 425.7 -37.0 453.4 -12.7C481.0 11.6 507.3 45.1 526.4 80.7C545.6 116.4 560.7 159.6 568.4 201.3C576.1 243.0 577.7 289.4 572.7 330.9C567.7 372.4 555.5 415.1 538.5 450.0C521.4 485.0 497.2 517.5 470.6 540.6C444.1 563.6 411.4 580.9 379.3 588.6C347.1 596.2 310.9 595.6 278.0 586.6C245.2 577.5 210.8 558.9 182.2 534.5C153.5 510.0 126.3 476.2 106.3 439.9C86.2 403.6 70.3 359.5 62.0 316.9C53.6 274.2 51.5 226.5 56.1 183.8C60.8 141.2 72.8 97.1 89.9 60.9C106.9 24.7 131.5 -9.1 158.4 -33.3C185.4 -57.5 116.3 -152.9 251.5 -84.3C386.8 -15.7 859.8 283.5 970.0 378.5C1080.1 473.6 925.8 447.2 912.4 486.1C899.0 525.0 890.6 570.0 889.3 611.8C888.0 653.5 893.4 698.3 904.5 736.7C915.6 775.0 934.0 812.7 956.0 841.8C977.9 870.9 1006.6 895.8 1036.0 911.2C1065.5 926.6 1100.2 934.9 1132.8 934.1C1165.5 933.3 1201.0 923.6 1231.8 906.7C1262.7 889.8 1293.6 863.4 1318.0 832.8C1342.4 802.2 1364.0 763.0 1378.2 723.3C1392.4 683.6 1401.4 637.5 1403.2 594.6C1405.0 551.8 1400.0 505.7 1389.0 466.1C1378.0 426.5 1359.6 387.4 1337.4 357.1C1315.3 326.8 1286.2 300.7 1256.1 284.4C1226.0 268.0 1190.6 258.9 1157.1 259.1C1123.7 259.3 1087.2 268.7 1055.4 285.5C1023.5 302.2 991.6 328.8 966.2 359.7C940.9 390.7 918.3 430.5 903.3 471.0C888.3 511.5 933.6 545.3 876.2 602.7C818.9 660.1 600.6 763.8 559.0 815.6C517.3 867.4 609.2 876.9 626.3 913.6C643.4 950.2 656.0 993.9 661.5 1035.4C666.9 1077.0 666.1 1122.7 659.0 1162.9C651.9 1203.1 637.5 1243.9 618.9 1276.6C600.2 1309.4 574.5 1339.1 547.0 1359.4C519.6 1379.7 486.3 1393.7 454.1 1398.4C422.0 1403.1 386.1 1399.3 354.1 1387.5C322.1 1375.8 289.0 1354.5 262.0 1328.0C235.0 1301.6 209.8 1266.0 191.9 1228.6C174.0 1191.3 160.5 1146.7 154.5 1104.1C148.5 1061.5 148.8 1014.6 155.7 973.1C162.5 931.7 176.8 889.5 195.6 855.6C214.3 821.6 240.4 790.6 268.3 769.2C296.2 747.9 330.2 732.8 363.1 727.4C396.0 722.0 432.8 725.3 465.8 736.8C498.7 748.2 532.8 769.5 560.8 796.2C588.8 822.9 615.0 859.0 633.8 897.0C652.5 935.0 629.3 971.7 673.5 1024.1C717.6 1076.5 874.1 1166.3 898.7 1211.4C923.2 1256.6 842.0 1262.1 820.8 1295.1C799.5 1328.1 781.8 1369.0 771.3 1409.3C760.8 1449.7 756.0 1495.4 758.0 1537.0C759.9 1578.6 768.8 1622.3 783.0 1658.8C797.2 1695.4 818.6 1730.4 842.9 1756.4C867.2 1782.3 898.0 1803.3 928.8 1814.6C959.6 1826.0 995.1 1829.6 1027.8 1824.6C1060.6 1819.6 1095.4 1805.2 1125.1 1784.4C1154.8 1763.6 1183.8 1733.4 1205.9 1699.9C1228.1 1666.4 1246.7 1624.6 1257.9 1583.4C1269.1 1542.2 1274.5 1495.3 1273.0 1452.5C1271.4 1409.8 1262.7 1364.7 1248.6 1326.9C1234.5 1289.1 1212.9 1252.8 1188.3 1225.7C1163.7 1198.5 1132.4 1176.5 1100.9 1164.2C1069.4 1152.0 1033.1 1147.6 999.5 1152.2C965.9 1156.7 929.9 1170.8 899.3 1191.6C868.6 1212.5 838.6 1243.0 815.5 1277.0C792.5 1311.0 661.7 1316.9 761.0 1395.6C860.3 1474.3 1287.5 1690.1 1411.2 1749.0C1534.9 1807.9 1488.0 1749.0 1503.4 1749.0"
        style={{
          strokeWidth: '31.68px',
          strokeDasharray: '0, 11252',
          strokeDashoffset: '0',
          visibility: 'hidden'
        }}
      />
    </svg>
  );
}
