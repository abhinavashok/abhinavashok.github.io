---
layout: default
title: Posts
---

<div class="post-list">
  {% for post in site.posts %}
  <article class="post-card">
    <div class="post-card-meta">
      <time class="post-date">{{ post.date | date: "%B %d, %Y" }}</time>
      {% for label in post.labels %}
        <a href="/label/{{ label | slugify }}/" class="label label-{{ label | slugify }}">
          {{ label }}
        </a>
      {% endfor %}
    </div>
    <h2 class="post-card-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>
    <p class="post-card-excerpt">
      {{ post.excerpt | strip_html | truncatewords: 30 }}
    </p>
  </article>
  {% endfor %}

  {% if site.posts.size == 0 %}
  <p style="color: var(--ink-muted); margin-top: 2rem;">No posts yet — check back soon.</p>
  {% endif %}
</div>