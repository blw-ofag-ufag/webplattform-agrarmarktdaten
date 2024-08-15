Platform where the Market Analysis Unit of the Federal Office for Agriculture can publish data-centric reports, insights, news.

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/w73p.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

## Dato models audit

Dato models are configured at https://datocms.com/.

Since there are quite a few, and that validation rules need to be coherent across pages & records,
a small checker crudely parses the graphql Dato generated types & checks if every lead & content
field can links to the configured models. You can run it via:

```
yarn run dato:audit
```

If there is a warning, it means that you need to tweak the model field validation rules at the
aforementioned URL & then re-generate the types via `yarn run graphql:codegen`.
