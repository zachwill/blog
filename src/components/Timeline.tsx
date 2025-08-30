import React, { JSX } from 'react';

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

type IconAvatar = { kind: 'avatar'; image?: string; initials?: string; label: string };
type IconGlyph = { kind: 'icon'; name: string; label: string; ring?: boolean };
type IconDot = { kind: 'dot' };
type IconNode = { kind: 'node'; node: React.ReactNode; ring?: boolean };
type IconProp = IconAvatar | IconGlyph | IconDot | IconNode;

function RailIcon({ icon }: { icon?: IconProp }) {
  if (!icon) return null;

  const wrapperCls = cn(
    'wa-timeline__icon',
    icon.kind !== 'avatar' && (icon as IconGlyph | IconNode).ring ? 'wa-timeline__icon--ring' : null
  );

  return (
    <div className="wa-timeline__rail">
      <div className={wrapperCls}>
        {icon.kind === 'avatar' && (
          <wa-avatar
            image={icon.image}
            initials={icon.initials}
            label={icon.label}
          />
        )}
        {icon.kind === 'icon' && (
          <wa-icon name={icon.name} label={icon.label} />
        )}
        {icon.kind === 'dot' && (
          <span className="wa-timeline__dot" aria-hidden="true" />
        )}
        {icon.kind === 'node' && icon.node}
      </div>
    </div>
  );
}

export function Timeline({
  children,
  className,
  wrapper = true,
  ...cardProps
}: React.PropsWithChildren<{
  className?: string;
  wrapper?: boolean;
  style?: React.CSSProperties;
}>) {
  const timelineContent = (
    <div className={cn('wa-timeline wa-stack wa-gap-xs', className)}>
      {children}
    </div>
  );

  if (wrapper) {
    return (
      <wa-card style={{ maxWidth: '42rem', margin: '0 auto', ...cardProps.style }} {...cardProps}>
        {timelineContent}
      </wa-card>
    );
  }

  return timelineContent;
}

// Cleaner: date instead of dateLabel
Timeline.Group = function Group({
  date,
  headingAs = 'h3',
  collapsible = false,
  summary = 'Show older',
  children
}: React.PropsWithChildren<{
  date: React.ReactNode;
  headingAs?: keyof JSX.IntrinsicElements;
  collapsible?: boolean;
  summary?: string;
}>) {
  const Heading = headingAs as any;

  const content = (
    <section className="wa-timeline__group">
      <Heading className="wa-timeline__date">{date}</Heading>
      <ol className="wa-timeline__list" role="list">
        {children}
      </ol>
    </section>
  );

  if (collapsible) {
    return (
      <wa-details appearance="plain">
        <span slot="summary">{summary}</span>
        {content}
      </wa-details>
    );
  }

  return content;
};

Timeline.Item = function Item({
  icon,
  title,
  description,
  className,
  children
}: React.PropsWithChildren<{
  icon?: IconProp;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}>) {
  return (
    <li className={cn('wa-timeline__item', className)}>
      <RailIcon icon={icon} />
      <div className="wa-timeline__body">
        {title !== undefined && (
          <Timeline.Title>{title}</Timeline.Title>
        )}
        {description !== undefined && (
          <Timeline.Desc>{description}</Timeline.Desc>
        )}
        {children}
      </div>
    </li>
  );
};

Timeline.Title = function Title({
  icon,
  className,
  children
}: React.PropsWithChildren<{
  icon?: React.ReactNode;
  className?: string;
}>) {
  return (
    <h4 className={cn('wa-timeline__title', icon ? 'wa-cluster' : null, className)}>
      {icon}
      {children}
    </h4>
  );
};

Timeline.Desc = function Desc({
  className,
  children
}: React.PropsWithChildren<{
  className?: string;
}>) {
  return (
    <p className={cn('wa-timeline__desc', className)}>
      {children}
    </p>
  );
};

// Much cleaner Meta API
Timeline.Meta = function Meta({
  avatar,
  initials,
  name,
  time,
  dateTime,
  children
}: React.PropsWithChildren<{
  avatar?: string; // Just the image URL
  initials?: string; // For avatar fallback
  name?: string;
  time?: string; // Display time like "9:00 AM"
  dateTime?: string; // ISO datetime for <time> element
}>) {
  return (
    <div className="wa-timeline__meta">
      {(avatar || initials) && (
        <wa-avatar
          image={avatar}
          initials={initials}
          label={name || 'User'}
        />
      )}
      {name && <span>{name}</span>}
      {time && (
        <time dateTime={dateTime}>{time}</time>
      )}
      {children}
    </div>
  );
};

export function TimelineDemo() {
  return (
    <Timeline>
      {/* Group: Aug 1 */}
      <Timeline.Group date="1 Aug, 2023">
        <Timeline.Item
          icon={{
            kind: 'avatar',
            image: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=320&auto=format&fit=crop',
            label: 'James Collins'
          }}
        >
          <Timeline.Title icon={<wa-icon name="file-lines" label="Document" />}>
            Created "Preline in React" task
          </Timeline.Title>
          <Timeline.Desc>Find more detailed instructions here</Timeline.Desc>
          <Timeline.Meta
            avatar="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=64&auto=format&fit=crop"
            name="James Collins"
            time="9:00 AM"
            dateTime="2023-08-01T09:00:00-04:00"
          />
        </Timeline.Item>

        <Timeline.Item
          icon={{ kind: 'icon', name: 'bug', label: 'Bug', ring: true }}
          title="Release v5.2.0 quick bug fix"
          description="This release includes a few quick fixes for..."
        >
          <Timeline.Meta
            initials="A"
            name="Alex Gregarov"
            time="11:35 AM"
            dateTime="2023-08-01T11:35:00-04:00"
          />
        </Timeline.Item>

        <Timeline.Item
          icon={{
            kind: 'avatar',
            image: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=320&auto=format&fit=crop',
            label: 'James Collins'
          }}
          title='Marked "Install Charts" completed'
          description="Finally! You can check it out here"
        >
          <Timeline.Meta
            avatar="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?q=80&w=64&auto=format&fit=crop"
            name="James Collins"
            time="3:10 PM"
            dateTime="2023-08-01T15:10:00-04:00"
          />
        </Timeline.Item>
      </Timeline.Group>

      {/* Group: Jul 31 (ringed icon example) */}
      <Timeline.Group date="31 Jul, 2023">
        <Timeline.Item
          icon={{ kind: 'icon', name: 'wand-magic-sparkles', label: 'Magic', ring: true }}
          title="Take a break ⛳️"
          description="Just chilling for now..."
        />
      </Timeline.Group>

      {/* Minimal dot section + "Show older" */}
      <Timeline.Group date="30 Jul, 2023" collapsible summary="Show older">
        <Timeline.Item
          icon={{ kind: 'dot' }}
          title="Final touch ups"
          description="Double check everything and make sure we're ready to go."
        />
      </Timeline.Group>
    </Timeline>
  );
}