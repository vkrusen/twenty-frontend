'use client';

import styled from '@emotion/styled';
import { Logo } from './Logo';
import { DiscordIcon, GithubIcon2, LinkedInIcon, XIcon } from './Icons';
import { usePathname } from 'next/navigation';

const FooterContainer = styled.div`
  padding: 64px 96px 64px 96px;
  display: flex;
  flex-direction: column;
  color: rgb(129, 129, 129);
  gap: 32px;
  @media (max-width: 809px) {
    display: none;
  }
`;

const LeftSideFooter = styled.div`
  width: 36Opx;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightSideFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 48px;
  height: 146px;
`;

const RightSideFooterColumn = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RightSideFooterLink = styled.a`
  color: rgb(129, 129, 129);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;

const RightSideFooterColumnTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
`;

export const FooterDesktop = () => {
  const path = usePathname();
  const isTwentyDev = path.includes('developers');

  if (isTwentyDev) return;

  return (
    <FooterContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <LeftSideFooter>
          <Logo />
          <div>The #1 Open Source CRM</div>
        </LeftSideFooter>
        <RightSideFooter>
          <RightSideFooterColumn>
            <RightSideFooterColumnTitle>Company</RightSideFooterColumnTitle>
            <RightSideFooterLink href="/pricing">Pricing</RightSideFooterLink>
            <RightSideFooterLink href="/story">Story</RightSideFooterLink>
          </RightSideFooterColumn>
          <RightSideFooterColumn>
            <RightSideFooterColumnTitle>Resources</RightSideFooterColumnTitle>
            <RightSideFooterLink href="https://docs.twenty.com">
              Documentation
            </RightSideFooterLink>
            <RightSideFooterLink href="/releases">
              Changelog
            </RightSideFooterLink>
          </RightSideFooterColumn>
          <RightSideFooterColumn>
            <RightSideFooterColumnTitle>Other</RightSideFooterColumnTitle>
            <RightSideFooterLink href="/oss-friends">
              OSS Friends
            </RightSideFooterLink>
            <RightSideFooterLink href="/legal/terms">
              Terms of Service
            </RightSideFooterLink>
            <RightSideFooterLink href="/legal/privacy">
              Privacy Policy
            </RightSideFooterLink>
          </RightSideFooterColumn>
        </RightSideFooter>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTop: '1px solid rgb(179, 179, 179)',
          paddingTop: '32px',
        }}
      >
        <div>
          <span style={{ fontFamily: 'Inter, sans-serif' }}>©</span>
          2023 Twenty PBC
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <a href="https://x.com/twentycrm" target="_blank" rel="noreferrer">
            <XIcon size="M" />
          </a>
          <a
            href="https://github.com/twentyhq/twenty"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon2 size="M" />
          </a>
          <a
            href="https://www.linkedin.com/company/twenty"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon size="M" />
          </a>
          <a
            href="https://discord.gg/UfGNZJfAG6"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon size="M" />
          </a>
        </div>
      </div>
    </FooterContainer>
  );
};
