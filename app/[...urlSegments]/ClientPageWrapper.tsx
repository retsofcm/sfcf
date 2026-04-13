'use client';

import React from "react";
import ClientPage, { ClientPageProps } from "./client-page";

interface WrapperProps {
  initialData: ClientPageProps;
}

export default function ClientPageWrapper({ initialData }: WrapperProps) {
  return <ClientPage {...initialData} />;
}
