import React from "react";

export const Logo = ({ className }: { className?: string }) => (
  <svg width="190" height="76" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 400" className={className}>
    <path fill="green" fillOpacity={1} stroke="none" d="M478.017 202.23C364.42 33.516 200.077 150.408 98.913 121.956c87.55 82.581 218.969-22.265 379.104 80.276Z" />
    <path fill="#165016" fillOpacity={1} stroke="none" d="M479.59 208.615c-131.52-87.231-300.046-8.12-461.072-48.284 113.23 78.756 317.704 10.034 461.072 48.284Z" />
    <path fill="green" fillOpacity={1} stroke="none" d="M484.98 202.23c114.072-168.715 279.102-51.823 380.688-80.275-87.916 82.581-219.884-22.265-380.687 80.276Z" />
    <path fill="#165016" fillOpacity={1} stroke="none" d="M483.408 208.615c129.271-87.231 294.915-8.12 453.187-48.284-111.294 78.756-312.271 10.034-453.187 48.284z" />
    <text xmlSpace="preserve" x="16.73" y="296.665" transform="scale(1.02882 .972)">
      <tspan x="16.73" y="296.665" fontFamily="Montserrat" fontWeight={700} fontSize="100.335" fill="green">STENSON FIELDS</tspan>
    </text>
    <text xmlSpace="preserve" x="17.903" y="414.721" transform="scale(1.1726 .8528)">
      <tspan x="17.903" y="414.721" fontFamily="Angelina" fontSize="132.633" fill="#b3b3b3">christian fellowship</tspan>
    </text>
    <path fill="#4a0" fillOpacity={1} stroke="none" d="M484.156 190.402c46.085-164.01 193-122.946 263.657-169.026-47.055 87.454-167.157 36.69-263.657 169.026Z" />
  </svg>
);
